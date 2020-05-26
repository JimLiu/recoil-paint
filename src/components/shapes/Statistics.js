import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native-web';
import { useSetRecoilState, useRecoilValueLoadable } from 'recoil';
import Element from './Element';
import { itemWithId, statisticsQuery } from '../../recoil/selectors';

export default function Statistics({ id, series, status, ...others }) {
  const setItemState = useSetRecoilState(itemWithId(id));
  const statisticsLoadable = useRecoilValueLoadable(statisticsQuery(id));

  useEffect(() => {
    console.log(statisticsLoadable.state)
    if (statisticsLoadable.state === 'hasValue') {
      setItemState(item => ({
        ...item,
        ...statisticsLoadable.contents,
        status: 'loaded'
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statisticsLoadable.state]);

  let content;

  if (status === 'loading') {
    content = <ActivityIndicator size="large" />
  } else {
    content = (
      <View style={styles.container}>
        {series.map((serie, i) => (
          <View
            key={`serie-${i}`}
            style={[
              styles.bar,
              {
                height: serie * 100,
              }
            ]}
          />
        ))}
      </View>
    )
  }

  return (
    <Element
      {...others}
      style={styles.root}
    >
      {content}
    </Element>
  );
}

const styles = StyleSheet.create({
  root: {},
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'flex-end',
  },
  bar: {
    marginHorizontal: 4,
    backgroundColor: '#1189c7',
    width: 20,
  }
});
