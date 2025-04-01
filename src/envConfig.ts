import pkg from '@next/env';
import path from 'path'

const { loadEnvConfig } = pkg;
const projectDir = path.resolve(process.cwd(), '../internal/frontend')
loadEnvConfig(projectDir)