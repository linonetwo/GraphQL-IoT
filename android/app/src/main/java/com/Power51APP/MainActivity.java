package com.IrrigatorAPP;

import com.facebook.react.ReactActivity;
import com.github.reactNativeMPAndroidChart.MPAndroidChartPackage;

import android.content.Intent; // <--- import https://github.com/yamill/react-native-orientation#android
import android.content.res.Configuration; // <--- import https://github.com/yamill/react-native-orientation#android


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "IrrigatorAPP";
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }

}
