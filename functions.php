<?php

// // Allow SVG uploads

// function allow_svgimg_types($mimes) {
//   $mimes['svg'] = 'image/svg+xml';
//   return $mimes;
// }
// add_filter('upload_mimes', 'allow_svgimg_types');


function total_child_enqueue_parent_theme_style() {

	// Dynamically get version number of the parent stylesheet (lets browsers re-cache your stylesheet when you update your theme)
	$theme   = wp_get_theme( 'Divi' );
	$version = $theme->get( 'Version' );

	// Load the stylesheet
	wp_enqueue_style('parent-style', get_template_directory_uri().'/style.css', array(), $version );

}

add_action( 'wp_enqueue_scripts', 'total_child_enqueue_parent_theme_style' );



// //Load after wp_enqueue_scripts has run (hooked)
// //Allows SASS to operate on site. Install in child Theme folder
// $theme = wp_get_theme(); //empties cache on reload
// wp_enqueue_style('Style', get_template_directory_uri().'./css/styles.css', array(), $theme->get('Version'), 'all');
