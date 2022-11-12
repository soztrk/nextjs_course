const {PHASE_DEVELOPMENT_SERVER} = require("next/constants")

module.exports = (phase) => {
    if(phase === PHASE_DEVELOPMENT_SERVER){
        return{
            env:{
                mongodb:{
                    username:"root",
                    password:"Root123",
                    cluster:"cluster0.7b4z5",
                    database:"sblog"
                }
            }
        }
    }
    return{
        env:{
            mongodb:{
                username:"root",
                password:"Root123",
                cluster:"cluster0.7b4z5",
                database:"sblog-prod"
            }
        },
        NEXTAUTH_URL:"http://localhost"
    }
}