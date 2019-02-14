import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const images = [
  {webformatURL: 'image1', tags: 'tags1'},
  {webformatURL: 'image2', tags: 'tags2'},
  {webformatURL: 'image3', tags: 'tags3'},
  {webformatURL: 'image4', tags: 'tags4'},
  {webformatURL: 'image5', tags: 'tags5'},
  {webformatURL: 'image6', tags: 'tags6'},
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should render loading message when no images and no error', () => {
  const app = shallow(<App />);
  app.setState({hasErrored: false, images:[]});
  expect(app).toMatchSnapshot();
})

it('should render error message if error state', () => {
  const app = shallow(<App />);
  app.setState({hasErrored: true});
  expect(app).toMatchSnapshot();
})

it('should render error message if error state and images have been loaded', () => {
  const app = shallow(<App />);
  app.setState({hasErrored: true, images: [1,2,3,5]});
  expect(app).toMatchSnapshot();
})

it('should display frist image when images are loaded', () =>{
  const app = shallow(<App />);
  app.setState({images});
  expect(app).toMatchSnapshot();
})

it('should display next image when next button clicked', () =>{
  const app = shallow(<App />);
  app.setState({images});
  expect(app.find('button').length).toBe(2);
  app.find('button').last().simulate('click');
  expect(app).toMatchSnapshot();
})

it('should display previous image when previous button clicked', () =>{
  const app = shallow(<App />);
  app.setState({images});
  expect(app.find('button').length).toBe(2);
  app.find('button').first().simulate('click');
  expect(app).toMatchSnapshot();
})