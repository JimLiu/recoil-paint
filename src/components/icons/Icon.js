import { StyleSheet, unstable_createElement as createElement } from 'react-native-web';

export default function Icon(props) {
  const {
    ariaLabel, children, width, height, viewBox,
  } = props;
  const style = [styles.root, props.style];

  return createElement(
    'svg',
    {
      role: 'presentation',
      width,
      height,
      'aria-label': ariaLabel,
      style,
      viewBox: viewBox || '0 0 24 24',
    },
    children,
  );
}

Icon.defaultProps = {
  width: 24,
  height: 24,
};


const styles = StyleSheet.create({
  root: {
    display: 'inline-block',
    fill: 'currentcolor',
    height: '1.25em',
    maxWidth: '100%',
    position: 'relative',
    userSelect: 'none',
    textAlignVertical: 'text-bottom',
  },
  iconRtl: {
    transform: [{
      scaleX: -1,
    }],
  },
});
