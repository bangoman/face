<?php
$dest = imagecreatefrompng('img/self.png');
$src = imagecreatefromjpeg('img/face.jpg');
print_r($_REQUEST);
imagealphablending($dest, false);
imagesavealpha($dest, true);

imagecopymerge($dest, $src, 10, 9, 0, 0, 181, 180, 100); //have to play with these numbers for it to work for you, etc.

header('Content-Type: image/png');
imagepng($dest);

imagedestroy($dest);
imagedestroy($src);
?>
