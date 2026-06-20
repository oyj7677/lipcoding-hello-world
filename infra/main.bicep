targetScope = 'subscription'

@description('The Azure Developer CLI environment name.')
param environmentName string

@description('Azure region for the Static Web App.')
param location string

@description('Tags applied to every deployed resource.')
param tags object = {}

var normalizedEnvironmentName = toLower(replace(environmentName, '_', '-'))
var resourceGroupName = 'rg-${normalizedEnvironmentName}'
var staticWebAppName = 'swa-${take(normalizedEnvironmentName, 24)}-${uniqueString(subscription().id, normalizedEnvironmentName, location)}'
var defaultTags = union(tags, {
  'azd-env-name': normalizedEnvironmentName
})

resource resourceGroup 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: resourceGroupName
  location: location
  tags: defaultTags
}

module web 'resources/static-web-app.bicep' = {
  name: 'static-web-app'
  scope: resourceGroup
  params: {
    name: staticWebAppName
    location: location
    serviceName: 'web'
    tags: defaultTags
  }
}

output AZURE_LOCATION string = location
output AZURE_RESOURCE_GROUP string = resourceGroup.name
output WEB_ENDPOINT string = web.outputs.endpoint
