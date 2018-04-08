import { expect } from 'chai';
import { shallow } from '@vue/test-utils';
import Login from '@/components/authentication/Login.vue';

describe('Login shows right messages', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallow(Login, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
