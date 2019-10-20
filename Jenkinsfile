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
                sh 'sudo mkdir -p /www && sudo rm -r /www && sudo mkdir /www'
                sh 'cp -r ./Site/bin/Release/netcoreapp2.1/publish/* /www/'
                sh 'sudo systemctl start kestrel-sacantrell-site.service'
            }
        }
    }
}
