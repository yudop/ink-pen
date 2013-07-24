package com.vinasaver.inkpen;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);     //  Fixed Portrait orientation
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
				WindowManager.LayoutParams.FLAG_FULLSCREEN);

		WebView myWebView = new WebView(this);

//		myWebView.setLayerType(WebView.LAYER_TYPE_HARDWARE, null);

//		myWebView.setWebChromeClient(new WebChromeClient() {
//			@Override
//			public boolean onConsoleMessage(ConsoleMessage cm) {
//				Log.d("MyApplication", cm.message() + " -- From line "
//						+ cm.lineNumber() + " of "
//						+ cm.sourceId() );
//				return true;
//			}
//		});
		myWebView.setWebChromeClient(new WebChromeClient() {
			@Override
			public void onConsoleMessage(String message, int lineNumber, String sourceID) {
				Log.d("MyApplication", message + " -- From line "
						+ lineNumber + " of "
						+ sourceID);
			}
		});

		setContentView(myWebView);
		WebSettings webSettings = myWebView.getSettings();
		webSettings.setJavaScriptEnabled(true);
		myWebView.loadUrl("file:///android_asset/index.html");
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
