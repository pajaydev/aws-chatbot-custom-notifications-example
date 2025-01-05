#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CustomNotificationsStack } from '../lib/custom-notifications-stack';

const app = new cdk.App();
new CustomNotificationsStack(app, 'CustomNotificationsStack');
