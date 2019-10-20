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
                sh 'mkdir -p /www && rm -r /www && mkdir /www'
                sh 'cp -r ./Site/bin/Release/netcoreapp2.1/publish/* /www/'
                sh 'sudo systemctl start kestrel-sacantrell-site.service'
            }
        }
    }
}
