// setup file
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'jest-fetch-mock';

// Setup Enzyme adapter.
Enzyme.configure({ adapter: new Adapter() });

global.mount = mount;
global.render = render;
global.shallow = shallow;
global.toJson = toJson;
global.fetch = fetch;
