targetScope = 'resourceGroup'

@description('Static Web App resource name.')
param name string

@description('Azure region for the Static Web App.')
param location string

@description('azd service name that maps this resource to azure.yaml.')
param serviceName string

@description('Tags applied to the Static Web App.')
param tags object = {}

resource staticWebApp 'Microsoft.Web/staticSites@2023-12-01' = {
  name: name
  location: location
  tags: union(tags, {
    'azd-service-name': serviceName
  })
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {}
}

output endpoint string = 'https://${staticWebApp.properties.defaultHostname}'
