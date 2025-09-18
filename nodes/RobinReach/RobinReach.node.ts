import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  ILoadOptionsFunctions,
  INodePropertyOptions,
  NodeOperationError,
  NodeConnectionType,
} from 'n8n-workflow';

export class RobinReach implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'RobinReach',
    name: 'robinReach',
    icon: 'file:robinreach.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Automate social media posting with RobinReach AI-powered platform',
    defaults: {
      name: 'RobinReach',
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    credentials: [
      {
        name: 'robinReachApi',
        required: true,
      },
    ],
    properties: [
      // Main Operation Selection
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'List Brands',
            value: 'listBrands',
            description: 'Get all your brands/companies',
            action: 'List all brands',
          },
          {
            name: 'List Social Profiles',
            value: 'listSocialProfiles',
            description: 'Get connected social media accounts',
            action: 'List social profiles',
          },
          {
            name: 'Create Post',
            value: 'createPost',
            description: 'Create and publish social media post',
            action: 'Create a post',
          },
        ],
        default: 'createPost',
      },

      // ========================================
      // LIST SOCIAL PROFILES & CREATE POST - Brand Selection
      // ========================================
      {
        displayName: 'Brand',
        name: 'brandId',
        type: 'options',
        typeOptions: {
          loadOptionsMethod: 'getBrands',
        },
        displayOptions: {
          show: {
            operation: ['listSocialProfiles', 'createPost'],
          },
        },
        default: '',
        required: true,
        description: 'Select the brand to work with',
      },

      // ========================================
      // CREATE POST - Main Configuration
      // ========================================
      
      // Post Content
      {
        displayName: 'Post Content',
        name: 'content',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        displayOptions: {
          show: {
            operation: ['createPost'],
          },
        },
        default: '',
        required: true,
        placeholder: 'Your amazing social media content...',
        description: 'The main text content of your post',
      },

      // Social Profiles Selection
      {
        displayName: 'Social Profiles',
        name: 'socialProfiles',
        type: 'multiOptions',
        typeOptions: {
          loadOptionsMethod: 'getSocialProfiles',
          loadOptionsDependsOn: ['brandId'],
        },
        displayOptions: {
          show: {
            operation: ['createPost'],
          },
        },
        default: [],
        required: true,
        description: 'Select which social media accounts to post to',
      },

      // Post Action
      {
        displayName: 'Action',
        name: 'postAction',
        type: 'options',
        displayOptions: {
          show: {
            operation: ['createPost'],
          },
        },
        options: [
          {
            name: 'Publish Now',
            value: 'publish',
            description: 'Post immediately to selected platforms',
          },
          {
            name: 'Schedule',
            value: 'schedule',
            description: 'Schedule post for later',
          },
          {
            name: 'Save as Draft',
            value: 'draft',
            description: 'Save as draft for manual publishing',
          },
        ],
        default: 'draft',
        required: true,
      },

      // Schedule Time (only for scheduled posts)
      {
        displayName: 'Schedule Time',
        name: 'scheduleTime',
        type: 'dateTime',
        displayOptions: {
          show: {
            operation: ['createPost'],
            postAction: ['schedule'],
          },
        },
        default: '',
        required: true,
        description: 'When to publish the post',
      },

      // Timezone
      {
        displayName: 'Timezone',
        name: 'timezone',
        type: 'options',
        displayOptions: {
          show: {
            operation: ['createPost'],
            postAction: ['schedule'],
          },
        },
        typeOptions: {
          loadOptionsMethod: 'getTimezones',
        },
        default: 'UTC',
        description: 'Timezone for scheduled posting',
      },

      // ========================================
      // ADVANCED OPTIONS (Collapsible)
      // ========================================
      {
        displayName: 'Advanced Options',
        name: 'advancedOptions',
        type: 'collection',
        placeholder: 'Add Advanced Setting',
        displayOptions: {
          show: {
            operation: ['createPost'],
          },
        },
        default: {},
        options: [
          // AI Content Enhancement
          {
            displayName: 'Use AI Enhancement',
            name: 'useAI',
            type: 'boolean',
            default: false,
            description: 'Let RobinReach AI optimize your content',
          },
          {
            displayName: 'AI Tone',
            name: 'aiTone',
            type: 'options',
            displayOptions: {
              show: {
                useAI: [true],
              },
            },
            options: [
              { name: 'Professional', value: 'professional' },
              { name: 'Casual', value: 'casual' },
              { name: 'Friendly', value: 'friendly' },
              { name: 'Enthusiastic', value: 'enthusiastic' },
              { name: 'Informative', value: 'informative' },
            ],
            default: 'professional',
          },

          // Media Attachments
          {
            displayName: 'Media URLs',
            name: 'mediaUrls',
            type: 'string',
            typeOptions: {
              multipleValues: true,
            },
            default: [],
            placeholder: 'https://example.com/image.jpg',
            description: 'URLs of images or videos to attach',
          },

          // Platform-Specific Settings
          {
            displayName: 'Platform-Specific Settings',
            name: 'platformSettings',
            type: 'fixedCollection',
            default: {},
            options: [
              {
                displayName: 'Facebook',
                name: 'facebook',
                values: [
                  {
                    displayName: 'Post Type',
                    name: 'postType',
                    type: 'options',
                    options: [
                      { name: 'Regular Post', value: 'post' },
                      { name: 'Story', value: 'story' },
                      { name: 'Reel', value: 'reels' },
                    ],
                    default: 'post',
                  },
                  {
                    displayName: 'First Comment',
                    name: 'comment',
                    type: 'string',
                    default: '',
                    placeholder: 'Auto-comment after posting...',
                  },
                ],
              },
              {
                displayName: 'Instagram',
                name: 'instagram',
                values: [
                  {
                    displayName: 'Post Type',
                    name: 'postType',
                    type: 'options',
                    options: [
                      { name: 'Feed Post', value: 'post' },
                      { name: 'Story', value: 'story' },
                      { name: 'Reel', value: 'reels' },
                    ],
                    default: 'post',
                  },
                  {
                    displayName: 'First Comment',
                    name: 'comment',
                    type: 'string',
                    default: '',
                  },
                ],
              },
              {
                displayName: 'Twitter',
                name: 'twitter',
                values: [
                  {
                    displayName: 'Thread Replies',
                    name: 'replies',
                    type: 'string',
                    typeOptions: {
                      multipleValues: true,
                    },
                    default: [],
                    placeholder: 'Additional tweets for thread...',
                  },
                ],
              },
            ],
          },

          // Labels/Tags
          {
            displayName: 'Labels',
            name: 'labels',
            type: 'string',
            default: '',
            placeholder: 'marketing, campaign, promotion',
            description: 'Comma-separated labels for organization',
          },
        ],
      },
    ],
  };

  methods = {
    loadOptions: {
      // Load available brands
      async getBrands(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
        try {
          const responseData = await this.helpers.requestWithAuthentication.call(
            this,
            'robinReachApi',
            {
              method: 'GET',
              url: '/brands',
              json: true,
            },
          );

          const brands = responseData.data || responseData || [];
          return brands.map((brand: any) => ({
            name: brand.name || `Brand ${brand.id}`,
            value: brand.id.toString(),
            description: brand.email || brand.website || '',
          }));
        } catch (error) {
          throw new NodeOperationError(this.getNode(), `Failed to load brands: ${(error as Error).message}`);
        }
      },

      // Load social profiles for selected brand
      async getSocialProfiles(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
        const brandId = this.getCurrentNodeParameter('brandId') as string;
        
        if (!brandId) {
          return [];
        }

        try {
          const responseData = await this.helpers.requestWithAuthentication.call(
            this,
            'robinReachApi',
            {
              method: 'GET',
              url: `/social_profiles?brand_id=${brandId}`,
              json: true,
            },
          );

          const profiles = responseData.data || responseData || [];
          return profiles.map((profile: any) => ({
            name: `${profile.name} (${profile.platform})`,
            value: profile.id.toString(),
            description: `${profile.platform} - ${profile.name}`,
          }));
        } catch (error) {
          throw new NodeOperationError(this.getNode(), `Failed to load social profiles: ${(error as Error).message}`);
        }
      },

      // Load common timezones
      async getTimezones(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
        const commonTimezones = [
          { name: 'UTC', value: 'UTC' },
          { name: 'Eastern Time (ET)', value: 'America/New_York' },
          { name: 'Central Time (CT)', value: 'America/Chicago' },
          { name: 'Mountain Time (MT)', value: 'America/Denver' },
          { name: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
          { name: 'London (GMT)', value: 'Europe/London' },
          { name: 'Paris (CET)', value: 'Europe/Paris' },
          { name: 'Tokyo (JST)', value: 'Asia/Tokyo' },
          { name: 'Sydney (AEST)', value: 'Australia/Sydney' },
        ];

        return commonTimezones;
      },
    },
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        let responseData: any;

        if (operation === 'listBrands') {
          // ========================================
          // LIST BRANDS
          // ========================================
          responseData = await this.helpers.requestWithAuthentication.call(
            this,
            'robinReachApi',
            {
              method: 'GET',
              url: '/brands',
              json: true,
            },
          );

          // Format the response
          const brands = responseData.data || responseData || [];
          returnData.push({
            json: {
              success: true,
              operation: 'listBrands',
              count: brands.length,
              brands: brands.map((brand: any) => ({
                id: brand.id,
                name: brand.name,
                email: brand.email,
                website: brand.website,
                timezone: brand.timezone,
                country: brand.country,
              })),
            },
          });

        } else if (operation === 'listSocialProfiles') {
          // ========================================
          // LIST SOCIAL PROFILES
          // ========================================
          const brandId = this.getNodeParameter('brandId', i) as string;

          responseData = await this.helpers.requestWithAuthentication.call(
            this,
            'robinReachApi',
            {
              method: 'GET',
              url: `/social_profiles?brand_id=${brandId}`,
              json: true,
            },
          );

          // Format the response
          const profiles = responseData.data || responseData || [];
          returnData.push({
            json: {
              success: true,
              operation: 'listSocialProfiles',
              brandId: brandId,
              count: profiles.length,
              socialProfiles: profiles.map((profile: any) => ({
                id: profile.id,
                name: profile.name,
                platform: profile.platform,
                imageUrl: profile.image_url,
                connected: true,
              })),
            },
          });

        } else if (operation === 'createPost') {
          // ========================================
          // CREATE POST
          // ========================================
          const content = this.getNodeParameter('content', i) as string;
          const socialProfiles = this.getNodeParameter('socialProfiles', i) as string[];
          const postAction = this.getNodeParameter('postAction', i) as string;
          const advancedOptions = this.getNodeParameter('advancedOptions', i, {}) as any;

          // Build the post payload
          const postPayload: any = {
            content: content,
            social_profile_ids: socialProfiles.map(id => parseInt(id)),
            status: postAction === 'publish' ? 'published' : 
                   postAction === 'schedule' ? 'scheduled' : 'draft',
          };

          // Add schedule time if scheduling
          if (postAction === 'schedule') {
            const scheduleTime = this.getNodeParameter('scheduleTime', i) as string;
            const timezone = this.getNodeParameter('timezone', i, 'UTC') as string;
            postPayload.publish_time = scheduleTime;
            postPayload.timezone = timezone;
          }

          // Add labels if provided
          if (advancedOptions.labels) {
            postPayload.label_list = advancedOptions.labels.split(',').map((l: string) => l.trim());
          }

          // Handle media URLs
          if (advancedOptions.mediaUrls && advancedOptions.mediaUrls.length > 0) {
            postPayload.attachments = advancedOptions.mediaUrls;
          }

          // Handle platform-specific settings
          if (advancedOptions.platformSettings) {
            postPayload.platform_attributes = {};
            
            // Facebook settings
            if (advancedOptions.platformSettings.facebook) {
              const fb = advancedOptions.platformSettings.facebook;
              postPayload.platform_attributes.facebook = {
                post_type: fb.postType || 'post',
                comment: fb.comment || '',
              };
            }

            // Instagram settings
            if (advancedOptions.platformSettings.instagram) {
              const ig = advancedOptions.platformSettings.instagram;
              postPayload.platform_attributes.instagram = {
                post_type: ig.postType || 'post',
                comment: ig.comment || '',
              };
            }

            // Twitter settings
            if (advancedOptions.platformSettings.twitter) {
              const tw = advancedOptions.platformSettings.twitter;
              postPayload.platform_attributes.twitter = {
                replies: tw.replies || [],
              };
            }
          }

          // AI Enhancement (placeholder - would need RobinReach API endpoint)
          if (advancedOptions.useAI) {
            // This would call RobinReach's AI enhancement API when available
            // For now, we'll add a note in the response
            postPayload.ai_enhanced = true;
            postPayload.ai_tone = advancedOptions.aiTone || 'professional';
          }

          // Create the post
          responseData = await this.helpers.requestWithAuthentication.call(
            this,
            'robinReachApi',
            {
              method: 'POST',
              url: '/posts',
              body: postPayload,
              json: true,
            },
          );

          // Format successful response
          returnData.push({
            json: {
              success: true,
              operation: 'createPost',
              action: postAction,
              postId: responseData.post_id || responseData.id,
              content: postPayload.content,
              platforms: socialProfiles.length,
              status: postPayload.status,
              scheduleTime: postPayload.publish_time || null,
              message: responseData.message || `Post ${postAction}ed successfully!`,
              data: responseData,
            },
          });
        }

      } catch (error: any) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              success: false,
              error: error.message,
              operation: operation,
              details: error.response?.data || error.response || 'Unknown error',
            },
          });
          continue;
        }
        throw new NodeOperationError(this.getNode(), error.message);
      }
    }

    return [returnData];
  }
}
