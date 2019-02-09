<?php
    session_start();
    $_SESSION['test'] = '233';
    echo $_REQUEST['test'];
    print_r($_REQUEST);
    print_r($_COOKIE);