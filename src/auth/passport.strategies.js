import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import config from '../config.js';
import UserManager from '../dao/usersManager.js';
import { isValidPassword } from '../utils.js';

const localStrategy = local.Strategy;
const manager = new UserManager();


const initAuthStrategies = () => {

    //Estrategia Local
    passport.use('login', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
            try {
                const foundUser = await manager.getOne({ email: username });

                if (foundUser && isValidPassword(password, foundUser.password)) {
                    const { password, ...filteredFoundUser } = foundUser;
                    return done(null, filteredFoundUser);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err, false);
            }
        }
    ));

    // passport.use('register', new localStrategy(
    //     {passReqToCallback: true, usernameField: 'email'},
    //     async (req, username, password, done) => {
    //         try {
    //             const { firstName, lastName, email, password } = req.body;
    //             const foundUser = await manager.getOne({ email: username });
    //             if (!foundUser) {
    //             const process = await manager.addUser({ firstName, lastName, email, password: createHash(password)});
    //             return done(null, process);
    //             } else {
    //                 return done(null, false);
    //             }
    //         } catch (err) {
    //             return done(err, false);
    //         }
    //     }
    // ));

   
    //Estrategia de GitHub
    passport.use('ghlogin', new GitHubStrategy( 
        {
            clientID: config.GITHUB_CLIENT_ID,
            clientSecret: config.GITHUB_CLIENT_SECRET,
            callbackURL: config.GITHUB_CALLBACK_URL
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                // Si passport llega hasta acá, es porque la autenticación en Github
                // ha sido correcta, tendremos un profile disponible
                const email = profile._json?.email || null;
                
                // Necesitamos que en el profile haya un email
                if (email) {
                    const foundUser = await manager.getOne({ email: email });

                    if (!foundUser) {
                        const user = {
                            firstName: profile._json.name.split(' ')[0],
                            lastName: profile._json.name.split(' ')[1],
                            email: email,
                            password: 'none'
                        }

                        const process = await manager.addUser(user);

                        return done(null, process);
                    } else {
                        return done(null, foundUser);
                    }
                } else {
                    return done(new Error('Faltan datos de perfil'), null);
                }
            } catch (err) {
                return done(err, false);
            }
        }
    ));


    passport.serializeUser((user, done) => {
        done(null, user);
    });
        
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

export default initAuthStrategies;
