<?php

	require_once('constants.php');

	// Create connection to the database
	function dbConnect()
	{
		try {
			$db = new PDO('mysql:host=' . DB_SERVER . ';dbname=' . DB_NAME . ';charset=utf8',
			 DB_USER, DB_PASSWORD);
		} catch (PDOException $exception) {
			error_log('Connection error: ' . $exception->getMessage());
			return false;
		}
		return $db;
	}

	// Check login / password of a user
	function dbCheckUser($db, $login, $password)
	{
		try {
			$statement = $db->prepare('SELECT * FROM user WHERE login = :login AND password = SHA256(:password)');
			$statement->execute(array('login' => $login, 'password' => $password));
			$result = $statement->fetch();
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}

		if (!$result) {
			return false;
		}
		return true;
	}

	// Add a token to the database
	function dbAddToken($db, $token, $login)
	{
		try {
			$statement = $db->prepare('UPDATE user SET token = :token WHERE login= :login');
			$statement->execute(array('token' => $token, 'login' => $login));
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return true;
	}

	// Verify a user token
	function dbVerifyToken($db, $token)
	{
		try {
			$statement = $db->prepare('SELECT * FROM user WHERE token = :token');
			$statement->execute(array('token' => $token));
			$result = $statement->fetch();
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}

		if (!$result) {
			return false;
		}
		return $result['login'];
	}

	// Get all programs of an user
	function dbRequestPrograms($db, $login)
	{
		try {
			$statement = $db->prepare('SELECT * FROM program WHERE login = :login');
			$statement->execute(array('login' => $login));
			$result = $statement->fetchAll();
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}

		if (!$result) {
			return false;
		}
		return $result;
	}

	// Get a specific program
	function dbRequestProgram($db, $id, $login)
	{
		try {
			$statement = $db->prepare('SELECT * FROM program WHERE id = :id AND login = :login');
			$statement->execute(array('id' => $id, 'login' => $login));
			$result = $statement->fetch();
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}

		if (!$result) {
			return false;
		}
		return $result;
	}

	// Add a program
	function dbAddProgram($db, $name, $login)
	{
		try {
			$statement = $db->prepare('INSERT INTO program (name, login) VALUES (:name, :login)');
			$statement->execute(array('name' => $name, 'login' => $login));
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return true;
	}

	// Modify a program
	function dbModifyProgram($db, $name, $id, $login)
	{
		try {
			$statement = $db->prepare('UPDATE program SET name = :name WHERE id = :id AND login = :login');
			$statement->execute(array('name' => $name, 'id' => $id, 'login' => $login));
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return true;
	}

	// Delete a program
	function dbDeleteProgram($db, $id, $login)
	{
		try {
			$statement = $db->prepare('DELETE FROM program WHERE id = :id AND login = :login');
			$statement->execute(array('id' => $id, 'login' => $login));
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return true;
	}

	// Get all exercises of a program
	function dbRequestExercises($db, $id_program, $login)
	{
		try {
			$statement = $db->prepare('SELECT * FROM exercise WHERE id_program = :id_program AND login = :login');
			$statement->execute(array('id_program' => $id_program, 'login' => $login));
			$result = $statement->fetchAll();
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		
		if (!$result) {
			return false;
		}
		return $result;
	}

	// Get a specific exercise
	function dbRequestExercise($db, $id, $login)
	{
		try {
			$statement = $db->prepare('SELECT * FROM exercise WHERE id = :id AND login = :login');
			$statement->execute(array('id' => $id, 'login' => $login));
			$result = $statement->fetch();
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}

		if (!$result) {
			return false;
		}
		return $result;
	}

	// Add an exercise
	function dbAddExercise($db, $name, $serie, $repetition, $description, $id_program, $login)
	{
		try {
			$statement = $db->prepare('INSERT INTO exercise (name, serie, repetition, description, id_program, login)
			 VALUES (:name, :serie, :repetition, :description, :id_program, :login)');
			$statement->execute(array('name' => $name, 'serie' => $serie, 'repetition' => $repetition,'description' => $description,
			 'id_program' => $id_program, 'login' => $login));
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return true;
	}

	// Modify an exercise
	function dbModifyExercise($db, $name, $serie, $repetition, $description, $id_program, $id, $login)
	{
		try {
			$statement = $db->prepare('UPDATE exercise SET name = :name, serie = :serie, repetition = :repetition,
			 description = :description, id_program = :id_program WHERE id = :id AND login = :login');
			$statement->execute(array('name' => $name, 'serie' => $serie, 'repetition' => $repetition,'description' => $description,
			 'id_program' => $id_program, 'id' => $id, 'login' => $login));
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return true;
	}

	// Delete an exercise
	function dbDeleteExercise($db, $id, $login)
	{
		try {
			$statement = $db->prepare('DELETE FROM exercise WHERE id = :id AND login = :login');
			$statement->execute(array('id' => $id, 'login' => $login));
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return true;
	}

	// Get all session of an exercise
	function dbRequestSessions($db, $id_exercise, $login)
	{
		try {
			$statement = $db->prepare('SELECT * FROM session WHERE id_exercise = :id_exercise AND login = :login');
			$statement->execute(array('id_exercise' => $id_exercise, 'login' => $login));
			$result = $statement->fetchAll();
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}

		if (!$result) {
			return false;
		}
		return $result;
	}

	// Get a specific session
	function dbRequestSession($db, $id, $login)
	{
		try {
			$statement = $db->prepare('SELECT * FROM session WHERE id = :id AND login = :login');
			$statement->execute(array('id' => $id, 'login' => $login));
			$result = $statement->fetch();
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}

		if (!$result) {
			return false;
		}
		return $result;
	}

	// Add a session
	function dbAddSession($db, $repetition, $serie, $date, $id_exercise, $login)
	{
		try {
			$statement = $db->prepare('INSERT INTO session (repetition, serie, date, id_exercise, login)
			 VALUES (:repetition, :serie, :date, :id_exercise, :login)');
			$statement->execute(array('repetition' => $repetition, 'serie' => $serie, 'date' => $date,
			 'id_exercise' => $id_exercise, 'login' => $login));
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return true;
	}

	// Modify a session
	function dbModifySession($db, $repetition, $serie, $date, $id_exercise, $id, $login)
	{
		try {
			$statement = $db->prepare('UPDATE session SET repetition = :repetition, serie = :serie, date = :date,
			 id_exercise = :id_exercise WHERE id = :id AND login = :login');
			$statement->execute(array('repetition' => $repetition, 'serie' => $serie, 'date' => $date, 'id_exercise' => $id_exercise,
			 'id' => $id, 'login' => $login));
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return true;
	}

	// Delete a session
	function dbDeleteSession($db, $id, $login)
	{
		try {
			$statement = $db->prepare('DELETE FROM session WHERE id = :id AND login = :login');
			$statement->execute(array('id' => $id, 'login' => $login));
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return true;
	}