import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import React, {useRef} from 'react';

type Props = {};

const images = [
  {id: 1, img: require('./assets/home1.jpg'), title: 'Home1', color: '#33ccff'},
  {id: 2, img: require('./assets/home2.jpg'), title: 'Home2', color: '#ff33be'},
  {id: 3, img: require('./assets/home3.jpg'), title: 'Home3', color: '#33ccff'},
  {id: 4, img: require('./assets/home4.jpg'), title: 'Home4', color: '#ff33d6'},
  {id: 5, img: require('./assets/home5.jpg'), title: 'Home5', color: '#33ccff'},
  {id: 6, img: require('./assets/home6.jpg'), title: 'Home6', color: '#ff339c'},
];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = (props: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  console.log('windowWidth: ', windowWidth);
  console.log('scrollX: ', scrollX);

  return (
    <View>
      <View
        style={{
          height: 50,
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Header</Text>
      </View>
      <ScrollView scrollEventThrottle={16}>
        <View style={{flex: 1, backgroundColor: 'white', paddingTop: 20}}>
          <Text
            style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}>
            What can we help you find, Home
          </Text>

          <View style={{height: 200, marginTop: 20}}>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: false},
              )}>
              {images.map((image, imageIndex) => {
                return (
                  <Animated.View>
                    <Image
                      key={image.title}
                      source={image.img}
                      style={[styles.card]}
                    />
                  </Animated.View>
                );
              })}
            </ScrollView>
          </View>

          {/* Dots */}
          <View style={styles.indicatorContainer}>
            {images.map((image, imageIndex) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (imageIndex - 1),
                  windowWidth * imageIndex,
                  windowWidth * (imageIndex + 1),
                ],
                outputRange: [8, 16, 8],
                extrapolate: 'clamp',
              });
              console.log('interpolate:', `${imageIndex}x`, width);

              return (
                <Animated.View
                  key={image.title}
                  style={[
                    styles.normalDots,
                    {
                      width,
                      borderRadius: width,
                      backgroundColor: image.color,
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginVertical: 10,
    width: 450,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalDots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    marginTop: 8,
  },
});
