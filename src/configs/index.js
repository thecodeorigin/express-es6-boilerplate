import _get from 'lodash/get';

// Read Configurations
const environmentType = process.env.NODE_ENV || 'development'
const configs = require(`./${environmentType}.config`).default

const getServerConfigs = () => {
  return _get(configs, 'server', {});
};

const getBcryptConfigs = () => {
  return _get(configs, 'bcrypt', {});
};

const getDatabaseConfigs = () => {
    return _get(configs, 'database', {});
}

export {
  getServerConfigs,
  getBcryptConfigs,
  getDatabaseConfigs
};
