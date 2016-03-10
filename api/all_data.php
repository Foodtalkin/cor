<?php
  ob_start();
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");

     $conn = new mysqli("localhost", "shuchir_food", "F@!thR3b0urn", "shuchir_new_batcave");

    $result = $conn->query("SELECT * FROM user_mgmt ORDER BY `response_id` DESC");
    $temp = array();
    while($x = $result->fetch_array(MYSQLI_ASSOC)){
    	array_push($temp, $x);
    }
    print_r(json_encode($temp));
    // $outp = "";
    // $counter=1;
    // while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    //     if ($outp != "") {$outp .= ",";}

    //     $outp .= '{"id":"'. $counter.'",';
    //     $outp .= '"event_name":"'. $rs["event_name"].'",';
    //     $outp .= '"user_id": https://facebook.com/"'.$rs["user_id"].'",';
    //     $outp .= '"user_name":"'. $rs["user_name"].'",';
    //     $outp .= '"email":"'. $rs["email"].'",';
    //     $outp .= '"contact":"'. $rs["contact"].'",';
    //     $outp .= '"dob":"'. $rs["dob"].'",';
    //     $outp .= '"gender":"'. $rs["gender"].'",';
    //     $outp .= '"insta":"'. $rs["insta"].'",';
    //     $outp .= '"profession":"'. $rs["profession"].'",';
    //     $outp .= '"source":"'. $rs["source"].'",';
    //     $outp .= '"response":"'. $rs["response"].'",';
    //     $outp .= '"time_stamp":"'. $rs["time_stamp"] . '"}'; 

    //     $counter++;
    // }
    // $outp ='{"aaData":['.$outp.']}';
    // $conn->close();

    //echo(json_encode("Himanshu"));
?>
  