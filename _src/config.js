import { cosmiconfigSync } from 'cosmiconfig';

const explorer = cosmiconfigSync('crayon');

const searchedFor = explorer.search();

const { config } = explorer.load(searchedFor.filepath);

export default config;
