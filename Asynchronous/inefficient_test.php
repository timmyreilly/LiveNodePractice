<?php 

// Find a file and open it
// what disc, find the copper, network disc
// verify it exists
// setup the file
$file = fopen('test.txt', 'r');

// now do some operations
// go to the file, start reading block
// copy to memory
// convert to php data structure 
$contents = fread($file, 100000)

echo $contents;

// go clean it all up.
fclose($file); 

// What is my program doing in the meantime? 
// my program is just waiting... 
// great now read! 
// the net result is a lot of doing a whole lot nothing. 
// not a great use of computing resources. 
// how do you solve this problem? 
// php server to serve 100 requests a second? 
// whole bunch of servers? Not a super efficient use of resources. 
