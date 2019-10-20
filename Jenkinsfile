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
            when {
                branch 'master'
            }
            steps {
                echo 'Deploying site'
                sh 'deploy_sacantrell_site.sh Site/bin/Release/netcoreapp2.1/publish/.'
            }
        }
    }
}
