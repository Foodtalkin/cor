<?php
  ob_start();
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");

 $conn = new mysqli("localhost", "shuchir_food", "F@!thR3b0urn", "shuchir_new_batcave");
 $uid = $_POST['id'];
$uid = (int)$uid;

$result = $conn->query("SELECT * FROM user Where `id`= $uid");

$outp = "";
$counter=1;
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}

        $outp .= '{"id":"'. $counter.'",';
        $outp .= '"uid":"'. $rs["user_id"].'",';
        $outp .= '"name":"'. $rs["name"].'",';
        $outp .= '"email":"'. $rs["email"].'",';
        $outp .= '"phone":"'. $rs["contact"].'",';
        $outp .= '"dob":"'. $rs["dob"].'",';
        $outp .= '"gender":"'. $rs["gender"].'",';
        $outp .= '"insta":"'. $rs["insta"].'",';
        $outp .= '"profession":"'. $rs["profession"] . '"}'; 

    $counter++;
}
$outp ='{"aaData":['.$outp.']}';
$conn->close();

echo($outp);
?>
  