/*
 * Copyright 2021 Adobe. All rights reserved.
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
const { verifyConditions, publish } = require('../src/index.js');

describe('Verify Conditions Test', () => {
  it('verifyConditions is a function ', async () => {
    assert.strictEqual(typeof verifyConditions, 'function');
  });

  it('verifyConditions will reject release when environment does not have correct keys', async () => {
    const preenv = { ...process.env };
    delete process.env.CORALOGIX_TAGGER_API_KEY;
    await assert.rejects(verifyConditions({}, {}));
    process.env = preenv;
  });

  it('verifyConditions will accept release when environment does have correct keys', async () => {
    const preenv = { ...process.env };
    process.env.CORALOGIX_TAGGER_API_KEY = 'test';

    nock('https://api.coralogix.com')
      .get('/api/v1/external/rules')
      .reply(200);

    await assert.ok(await verifyConditions({}, { logger: console }));
    process.env = preenv;
  });

  it('verifyConditions will accept reject release when provided API key is invalid', async () => {
    const preenv = { ...process.env };
    process.env.CORALOGIX_TAGGER_API_KEY = 'test';

    nock('https://api.coralogix.com')
      .get('/api/v1/external/rules')
      .reply(401);

    await assert.rejects(verifyConditions({}, {}));
    process.env = preenv;
  });
});

describe('Publish Test', () => {
  it('publish is a function', async () => {
    assert.strictEqual(typeof publish, 'function');
  });

  it('publish calls Coralogix API', async () => {
    process.env.HELIX_FETCH_FORCE_HTTP1 = 'true';

    const scope = nock('https://webapi.coralogix.com')
      .post('/api/v1/external/tags')
      .reply(201);

    await publish({}, { nextRelease: { version: '1.0.0' }, logger: console });

    assert.ok(scope.isDone());
  });

  it('publish fails if Coralogix API fails', async () => {
    process.env.HELIX_FETCH_FORCE_HTTP1 = 'true';

    const scope = nock('https://webapi.coralogix.com')
      .post('/api/v1/external/tags')
      .reply(500);

    await assert.rejects(publish({}, { nextRelease: { version: '2.0.0' }, logger: console }), /500/);

    assert.ok(scope.isDone());
  });
});
