/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* eslint-env mocha */
const assert = require('assert');
const nock = require('nock');
const { tag } = require('../src/coralogix-tagger.js');

describe('Test Tagger', () => {
  it('Tag an old release', async () => {
    nock('https://webapi.coralogix.com')
      .post('/api/v1/external/tags')
      .reply((_, requestBody) => {
        assert.strictEqual(requestBody.name, 'v1.0');
        return [200];
      });
    assert.ok(await tag({
      applications: ['semantic-release'],
      tagname: 'v1.0',
      API_KEY: process.env.CORALOGIX_TAGGER_API_KEY,
    }));
  });
});
