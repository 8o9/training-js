import { readdir, stat } from './index.ts';
import * as fs from 'fs';

jest.mock('fs');

const mockedReaddir = fs.readdir as jest.MockedFunction<typeof fs.readdir>;
const mockedStat = fs.stat as jest.MockedFunction<typeof fs.stat>;

// WIP

