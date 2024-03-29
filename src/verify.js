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
const { verifytoken, reset } = require('./coralogix-tagger.js');

module.exports = async function verify(pluginConfig, { logger }) {
  if (!process.env.CORALOGIX_TAGGER_API_KEY) {
    throw new Error('Environment variable CORALOGIX_TAGGER_API_KEY is not set, unable to tag releases in Coralogix');
  }
  try {
    await verifytoken({
      ...pluginConfig,
      API_KEY: process.env.CORALOGIX_TAGGER_API_KEY,
    });
    logger.log('Coralogix Token is valid, releases can be tagged in Coralogix');
    return true;
  } finally {
    await reset();
  }
};
