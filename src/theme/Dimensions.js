import { Dimensions as RNDimensions } from 'react-native';

const { height: screenHeight, width: screenWidth } = RNDimensions.get('window');

const Dimensions = {
    // Define the height and width of the screen
    screenHeight,
    screenWidth,

    // Define the height of the pageView
    pageView: screenHeight / 2.64,
    pageViewContainer: screenHeight / 3.84,
    pageViewTextContainer: screenHeight / 7.03,

    // Define the height of the widgets
    height5: screenHeight / 168.8,
    height10: screenHeight / 84.4,
    height15: screenHeight / 56.3,
    height20: screenHeight / 42.2,
    height30: screenHeight / 28.13,
    height40: screenHeight / 21.1,
    height45: screenHeight / 18.75,

    // Define the width of the widgets
    width10: screenWidth / 84.4,
    width15: screenWidth / 56.3,
    width20: screenWidth / 42.2,
    width30: screenWidth / 28.13,

    // Define the font size of the text
    font16: screenHeight / 52.75,
    font20: screenHeight / 42.2,
    font26: screenHeight / 32.46,

    // Define the radius of the widgets
    radius15: screenHeight / 56.3,
    radius20: screenHeight / 42.2,
    radius30: screenHeight / 28.13,

    // Define the icon size of the widgets
    iconSize16: screenHeight / 52.75,
    iconSize24: screenHeight / 35.17,
    iconSize30: screenHeight / 18.75,

    // Define the list view size
    listViewImgSize: screenHeight / 3.25,
    listViewTextContSize: screenWidth / 3.9,

    // Define the popular food image size
    popularFoodImgSize: screenHeight / 2.41,

    // Define the bottom height bar
    bottomHeightBar: screenHeight / 7.03,
};

export default Dimensions;
