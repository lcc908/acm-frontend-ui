import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer = () => {
  const intl = useIntl();
  // const defaultMessage = intl.formatMessage({
  //   id: 'app.copyright.produced',
  //   defaultMessage: '蚂蚁集团体验技术部出品',
  // });
  // const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      // copyright={`${currentYear} ${defaultMessage}`}
      copyright={'2022 联想集团云计算部出品'}
      links={[
        {
          key: 'Ant Design Pro',
          title: '用户手册',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: '隐私',
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: '条款',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
