import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class LogSnag implements INodeType {
	description : INodeTypeDescription = {
		displayName: 'LogSnag',
		name: 'LogSnag',
		icon: 'file:logsnag.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Send events and insights to LogSnag',
		defaults: {
			name: 'LogSnag',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'logsnagApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.logsnag.com/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties : [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Log',
						value: 'log',
					},
					{
						name: 'Insight',
						value: 'insight',
					},
				],
				default: 'log',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'log',
						],
					},
				},
				options: [
					{
						name: 'Publish',
						value: 'publish',
						// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
						action: 'Publish an event to LogSnag',
						description: 'Publish an event to LogSnag',
						routing: {
							request: {
								method: 'POST',
								url: '/log',
							},
						},
					},
				],
				default: 'publish',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'insight',
						],
					},
				},
				options: [
					{
						name: 'Publish',
						value: 'publish',
						// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
						action: 'Publish an insight to LogSnag',
						description: 'Publish an insight to LogSnag',
						routing: {
							request: {
								method: 'POST',
								url: '/insight',
							},
						},
					},
				],
				default: 'publish',
			},
			// Log > Publish
			{
				displayName: 'Project',
				description: 'Project name',
				required: true,
				name: 'project',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'log',
						],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'project',
					},
				},
			},
			{
				displayName: 'Channel',
				description: 'Channel name',
				required: true,
				name: 'channel',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'log',
						],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'channel',
					},
				},
			},
			{
				displayName: 'Event',
				description: 'Event name',
				required: true,
				name: 'event',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'log',
						],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'event',
					},
				},
			},
			// Log > Publish > Optional
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: [
							'log',
						],
						operation: [
							'publish',
						],
					},
				},
				options: [
					{
						displayName: 'Description',
						description: 'Event description',
						name: 'description',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'description',
							},
						},
					},
					{
						displayName: 'Icon',
						description: 'Single emoji as the event icon',
						name: 'icon',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'icon',
							},
						},
					},
					{
						displayName: 'Notify',
						description: 'Whether to send push notification',
						name: 'notify',
						type: 'boolean',
						default: false,
						routing: {
							send: {
								type: 'body',
								property: 'notify',
							},
						},
					},
				],
			},
			// Insight > Publish
			{
				displayName: 'Project',
				description: 'Project name',
				required: true,
				name: 'project',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'insight',
						],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'project',
					},
				},
			},
			{
				displayName: 'Title',
				description: 'Insight title',
				required: true,
				name: 'title',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'insight',
						],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'title',
					},
				},
			},
			{
				displayName: 'Value',
				description: 'Insight value',
				required: true,
				name: 'value',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'insight',
						],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'value',
					},
				},
			},
			// Insight > Publish > Optional
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: [
							'insight',
						],
						operation: [
							'publish',
						],
					},
				},
				options: [
					{
						displayName: 'Icon',
						description: 'Single emoji as the insight icon',
						name: 'icon',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'icon',
							},
						},
					},
				],
			},
		],
	};
}
