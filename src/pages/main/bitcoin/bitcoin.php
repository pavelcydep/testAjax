<?php
function apiRun() {

    // This script randomly generates errors 3 out of 10 requests.
    // Uncomment following line to make all requests finish successfully.
    //$divine_intervention = 0;

    // Comment the following line to remove delay, or edit increase wait time.
    sleep(mt_rand(1, 3));

    // Randomly decide whether this request terminates successfully
    // or ends up with an error
    if (!isset($divine_intervention)) {
        $divine_intervention = mt_rand(0, 9);
    }

    switch($divine_intervention) {
        case 9:
            // Reply with a non-200 status code and no body
            $code = 400 + 100*mt_rand(0, 1) + mt_rand(0, 20);
            $proto = isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.0';
            header($proto.' '.$code.' Webmaster Is Drunk');
            exit;
         case 8:
            // Reply with code 200 but no valid JSON.
            header('Content-Type: text/html; charset=utf-8');
            echo "This is most certainly not a JSON response. Sorry.";
            exit;
      case 7:
            // Reply with JSON but include no data.
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'error' => 'Вы что, не видите, у нас обед! (╯°□°）╯︵ ┻━┻',
            ));
            exit;
       default:
            // Okay, no kidding, give them proper response this time
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(createBitaddress());
            break;
    }
}

// Creates valid API response
function createBitaddress() {
    sleep(mt_rand(1, 3));
    $res= array(
        'addr' => addressify('7 do not use this address', mt_rand(26, 35)),
        'pkey' => addressify('this is not a bitcoin key', mt_rand(51, 52)),
    );
    return $res;
}

// Turns input into something resembling
// a not-really-base58-formatted string of given length
function addressify($input, $total_length) {
    $result = '';

    // Add all symbols from input
    $input = preg_replace('~[^a-z0-9]~', '', $input);
    for ($i = 0; $i < strlen($input); $i++) {
        if (mt_rand(0, 1)) {
            $result .= strtoupper($input[$i]);
        } else {
            $result .= strtolower($input[$i]);
        }
    }

    // Add random chars at the end
    while (strlen($result) < $total_length) {
        $result .= getRandomChar();
    }

    return $result;
}

// Random alphanumeric char
function getRandomChar() {
    $base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return $base[mt_rand(0, strlen($base)-1)];
}

$succes=createBitaddress();
echo json_encode($succes);


    

?>