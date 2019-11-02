pipeline {
    agent any
    stages {
        stage('build-top-level') {
            steps {
                echo 'Building: top-level'
                dir ('top-level') {
                    withPythonEnv('/usr/pyenvs/nikola-env/') {
                        sh 'nikola theme -i bootstrap4'
                        sh 'nikola build'
                    }
                    sh 'rm -f top-level.zip'
                    zip zipFile: 'top-level.zip', archive: false, dir: 'output'
                    archiveArtifacts artifacts: 'top-level.zip', fingerprint: true
                }
            }
        }
        stage('build-games') {
            steps {
                echo 'Building: games'
                dir('games') {
                    sh 'dotnet restore'
                    sh 'dotnet publish --configuration Release'
                    sh 'rm -f games.zip'
                    zip zipFile: 'games.zip', archive: false, dir: 'Site/bin/Release/netcoreapp2.1/publish'
                    archiveArtifacts artifacts: 'games.zip', fingerprint: true
                }
            }
        }
    }
    post { 
        cleanup { 
            cleanWs()
        }
    }
}
