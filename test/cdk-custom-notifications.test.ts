import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CustomNotifications from '../lib/custom-notifications-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CustomNotifications.CustomNotificationsStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
