import React from 'react';
import SpotifyLogin from '../SpotifyLogin.js';
import PopupWindow from '../PopupWindow.js';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

test('Renders defaults', () => {
  const component = renderer.create(
    <SpotifyLogin clientId="foo" redirectUri="http://foo.test/auth/spotify"/>
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Renders with `className`', () => {
  const component = renderer.create(
    <SpotifyLogin clientId="foo" redirectUri="http://foo.test/auth/spotify" className="foobar"/>
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Renders with `buttonText`', () => {
  const component = renderer.create(
    <SpotifyLogin clientId="foo" redirectUri="http://foo.test/auth/spotify" buttonText="Foo"/>
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Opens OAuth dialog', () => {
  const clientId = 'foo';
  const redirectUri = 'http://foo.test/auth/spotify';

  const component = (
    <SpotifyLogin clientId={clientId} redirectUri={redirectUri}/>
  );
  const wrapper = shallow(component);

  wrapper.find('button').simulate('click');

  const query = `client_id=${clientId}&scope=user-read-private&redirect_uri=${redirectUri}&response_type=token`

  expect(wrapper.instance().popup.url).toBe(
    `https://accounts.spotify.com/authorize?${query}`
  );
});
