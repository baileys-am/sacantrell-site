pipeline {
    agent any
    stages {
        stage('build-top-level') {
            steps {
                echo 'Building: top-level'
                dir ('top-level') {
                    withPythonEnv('python') {
                        sh 'pip install --upgrade \"Nikola[extras]\"'
                        sh 'nikola theme -i bootstrap4'
                        sh 'build'
                    }
                }
            }
        }
        stage('build-games') {
            steps {
                echo 'Building: games'
                dir('games') {
                    sh 'dotnet restore'
                    sh 'dotnet publish --configuration Release'
                }
            }
        }
    }
}
