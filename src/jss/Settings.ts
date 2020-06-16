import { px, em, brighten } from "@artistry/jss";
import { Colors } from './Colors';

export const defaultValues = {
    /* Font Properties */
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: em(0.9),
    fontSizeSmall: em(0.7),
    fontSizeLarge: em(1.1),

    /* Box properties */
    padding: px(12),
    paddingSmall: px(5),
    paddingLarge: px(20),

    margin: px(0),
    marginLayout: px(10),

    borderWidth: px(1),
    borderRadius: px(5),
    spacing: px(12),

    dividerWidth: px(1),

    /* Color Properties */
    backgroundColor: Colors.white,
    color: Colors.black,
    borderColor: Colors.gray,
    foregroundBackgroundColor: brighten(Colors.gray, 10),
    headerBackgroundColor: '#ddd',
    headerColor: Colors.black,

    basicColor: Colors.white,
    basicColorAlt: Colors.black,
    widgetColor: '#ddd',
    widgetColorAlt: Colors.black,
    primaryColor: Colors.blue,
    primaryColorAlt: Colors.white,
    successColor: Colors.green,
    successColorAlt: Colors.white,
    infoColor: brighten(Colors.blue, 30),
    infoColorAlt: Colors.white,
    warningColor: Colors.orange,
    warningColorAlt: Colors.white,
    dangerColor: Colors.red,
    dangerColorAlt: Colors.white,
    disabledColor: '#ddd',
    disabledColorAlt: Colors.gray
}