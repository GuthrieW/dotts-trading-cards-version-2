import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import index from '..';

const index = (request: NextApiRequest, response: NextApiResponse) => {
	response.status(200).send(path.dirname);
};

export default index;
