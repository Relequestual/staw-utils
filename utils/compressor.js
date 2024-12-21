import LZ from 'lz-string';

const encodeURLData = (data) =>
  LZ.compressToEncodedURIComponent(JSON.stringify(data));

const generateDataURL = (data) => `${encodeURLData(data)}`;

const decodeURLData = (data) => LZ.decompressFromEncodedURIComponent(data);

export { generateDataURL, decodeURLData };
