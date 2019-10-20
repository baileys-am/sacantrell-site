pipeline {
    agent any
    stages {
        stage('site') {
            steps {
                echo 'Building site'
                sh 'dotnet restore'
                sh 'dotnet publish --configuration Release'
            }
        }
        stage('deploy') {
            steps {
                when {
                    branch 'master'
                }
                echo 'Deploying site'
                sh 'rm -r /www/'
                sh 'cp -r ./Site/bin/Release/netcoreapp2.1/publish/* /www/'
            }
        }
    }
}
