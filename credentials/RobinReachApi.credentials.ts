import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class RobinReachApi implements ICredentialType {
  name = 'robinReachApi';
  displayName = 'RobinReach API';
  documentationUrl = 'https://robinreach.com/api-docs';
  icon = 'file:robinreach.svg' as const;
  
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { 
        password: true,
      },
      default: '',
      required: true,
      description: 'Your RobinReach API key. Available for Bloom and Thrive plan users. Get it from your RobinReach dashboard.',
    },
    {
      displayName: 'Environment',
      name: 'environment',
      type: 'options',
      options: [
        {
          name: 'Production',
          value: 'production',
        },
        {
          name: 'Development',
          value: 'development',
        },
      ],
      default: 'production',
      description: 'The environment to connect to',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'Authorization': '=Bearer {{$credentials.apiKey}}',
        'Content-Type': 'application/json',
        'User-Agent': 'n8n-robinreach-integration/1.0.0',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.environment === "development" ? "http://localhost:3000/api/v1" : "https://robinreach.com/api/v1"}}',
      url: '/brands',
      method: 'GET',
    },
    rules: [
      {
        type: 'responseSuccessBody',
        properties: {
          message: 'Authentication successful',
          key: 'success',
          value: true,
        },
      },
    ],
  };
}
