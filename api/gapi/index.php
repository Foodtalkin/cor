<?php
require_once 'gapi.class.php';
$ga = new gapi("foodtalk@foodtalk-k325.iam.gserviceaccount.com", "key.p12");


$ga->requestReportData(99009092,array('date'),array('pageviews','visits'),array('date'),null,date('Y-m-d',strtotime('1 week ago')),date('Y-m-d'),1,7);
$data = array();
foreach($ga->getResults() as $result)
{
	//$list[] = array('id' => substr_replace(substr($result->getDate(),4), "-", 2, -2), 'name' => $result->getVisits());
	// $data = new stdClass();
	// $data->id=substr_replace(substr($result->getDate(),4), "-", 2, -2);
 //    $data->name=$result->getVisits();
 //    array_push($list,$data);
    array_push($data, substr_replace(substr($result->getDate(),4), "-", 2, -2));
    array_push($data, $result->getVisits());
}

// $ga->requestReportData(118455960,array('date'),array('pageviews','visits'),array('date'),null,date('Y-m-d',strtotime('1 week ago')),date('Y-m-d'),1,7);

// foreach($ga->getResults() as $result)
// {
// 	//$list[] = array('id' => substr_replace(substr($result->getDate(),4), "-", 2, -2), 'name' => $result->getVisits());
// 	// $list = new stdClass();
// 	// $list->id=substr_replace(substr($result->getDate(),4), "-", 2, -2);
//  //    $list->name=$result->getVisits();
//  //    array_push($list,$list);
//     array_push($data, substr_replace(substr($result->getDate(),4), "-", 2, -2));
//     array_push($data, $result->getVisits());
// }

$len = count($data);

$data1 = array_slice($data, 0, $len / 2);


$dates = array();
$fti = array();
print_r($data1);
print_r($data2);
// $ftp = array();
$j=0;
for ($i=0; $i < 14 ; $i= $i+2) { 
	$dates[$j] = $data1[$i];
	$fti[$j] = $data1[$i+1];
	$j++;
}


echo json_encode(array('date' => $dates, 'fti' => $fti));

  //echo json_encode($data);
?>