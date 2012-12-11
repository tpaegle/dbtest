var db;
var dbCreated = false;

//var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	
	dbCreated = true;
	var dbExisits = window.localStorage.getItem("test"); 
	if ( dbExisits == null ) {
		dbCreated = false;
		window.localStorage.setItem("test", "1"); 
	}
	
    db = window.openDatabase("my_db", "1.0", "PhoneGap Demo", 200000);
    if (dbCreated) {
    	db.transaction(getData, transaction_error); console.log("dbCreated=1");
	}else{
    	db.transaction(populateDB, transaction_error, populateDB_success);
	}
}

function transaction_error(tx, error) {
	//$('#busy').hide();
	console.log("transaction_error");
    alert("Database Error: " + error);
}

function populateDB_success() {
	dbCreated = true;console.log("populateDB_success");
    db.transaction(getData, transaction_error);
	
}

function addData() {
	console.log("addData");
	db = window.openDatabase("my_db", "1.0", "PhoneGap Demo", 200000);
	db.transaction(insertData, transaction_error);
}

function deleteData() {

	db = window.openDatabase("my_db", "1.0", "PhoneGap Demo", 200000);
	db.transaction(deleteRecord, transaction_error);
}

function deleteRecord(tx) {
	var sql = "delete from test where id=" + id_to_delete;
	$('#my_stuff').val('');
	tx.executeSql(sql);
}


function insertData(tx) {
	var sql = "insert into test (stuff ) values ('" + $('#my_stuff').val() + "')";
	$('#my_stuff').val('');

	tx.executeSql(sql, [], getData);
}




function getData(tx) {
	var sql = "select id, stuff from test";
	console.log(sql);	
	tx.executeSql(sql, [], getData_success);
}

function getData_success(tx, results) {
	$('#busy').hide();
	$('#data-stuff').empty();
	console.log(results.rows.length);	
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var test = results.rows.item(i);
		$('#data-stuff').append('<li class="db-item" tid="' + test.id + '">' + test.stuff + '</li>');
    }
	
	$('#data-stuff').listview('refresh');
	setTimeout(function(){
		scroll.refresh();
	},100);
	db = null;
}

function populateDB(tx) { 
	$('#busy').show();
	tx.executeSql('DROP TABLE IF EXISTS test');
	var sql = 
		"CREATE TABLE IF NOT EXISTS test ( " +
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"stuff VARCHAR(50))";
    tx.executeSql(sql);
	console.log("populateDB");
   tx.executeSql("insert into test (stuff ) values ('barney')");
     /*tx.executeSql("INSERT INTO employee (firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (11,'Amy','Jones',5,'Sales Representative','Sales','617-000-0011','781-000-0011','ajones@fakemail.com','Boston, MA','amy_jones.jpg')");
    tx.executeSql("INSERT INTO employee (firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (10,'Kathleen','Byrne',5,'Sales Representative','Sales','617-000-0010','781-000-0010','kbyrne@fakemail.com','Boston, MA','kathleen_byrne.jpg')");
    tx.executeSql("INSERT INTO employee (firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (9,'Gary','Donovan',2,'Marketing','Marketing','617-000-0009','781-000-0009','gdonovan@fakemail.com','Boston, MA','gary_donovan.jpg')");
    tx.executeSql("INSERT INTO employee (firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (8,'Lisa','Wong',2,'Marketing Manager','Marketing','617-000-0008','781-000-0008','lwong@fakemail.com','Boston, MA','lisa_wong.jpg')");
    tx.executeSql("INSERT INTO employee (firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (7,'Paula','Gates',4,'Software Architect','Engineering','617-000-0007','781-000-0007','pgates@fakemail.com','Boston, MA','paula_gates.jpg')");
    tx.executeSql("INSERT INTO employee (firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (5,'Ray','Moore',1,'VP of Sales','Sales','617-000-0005','781-000-0005','rmoore@fakemail.com','Boston, MA','ray_moore.jpg')");
    tx.executeSql("INSERT INTO employee (firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (6,'Paul','Jones',4,'QA Manager','Engineering','617-000-0006','781-000-0006','pjones@fakemail.com','Boston, MA','paul_jones.jpg')");
    tx.executeSql("INSERT INTO employee (firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (3,'Eugene','Lee',1,'CFO','Accounting','617-000-0003','781-000-0003','elee@fakemail.com','Boston, MA','eugene_lee.jpg')");
    tx.executeSql("INSERT INTO employee (firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (4,'John','Williams',1,'VP of Engineering','Engineering','617-000-0004','781-000-0004','jwilliams@fakemail.com','Boston, MA','john_williams.jpg')");
    tx.executeSql("INSERT INTO employee (firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (2,'Julie','Taylor',1,'VP of Marketing','Marketing','617-000-0002','781-000-0002','jtaylor@fakemail.com','Boston, MA','julie_taylor.jpg')");
    tx.executeSql("INSERT INTO employee (firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (1,'James','King',0,'President and CEO','Corporate','617-000-0001','781-000-0001','jking@fakemail.com','Boston, MA','james_king.jpg')");*/
}
