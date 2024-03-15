#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AppCDKStack } from '../lib/stack/app';

const app = new cdk.App();
  new AppCDKStack(app, 'CdkExpressApiStack', {
});