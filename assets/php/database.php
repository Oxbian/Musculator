<?php

	require_once('inc/constants.php');
	require_once('inc/sanitize.php');

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
		$login = sanitize_string($login);
		$password = sanitize_string($password);

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
		$token = sanitize_string($token);
		$login = sanitize_string($login);

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
		$token = sanitize_string($token);

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
		$login = sanitize_string($login);
		try {
			$statement = $db->prepare('SELECT * FROM program WHERE login = :login');
			$statement->execute(array('login' => $login));
			$result = $statement->fetchAll();
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return $result;
	}

	// Get a specific program
	function dbRequestProgram($db, $id, $login)
	{
		$id = sanitize_strint($id);
		$login = sanitize_string($login);

		try {
			$statement = $db->prepare('SELECT * FROM program WHERE id = :id AND login = :login');
			$statement->execute(array('id' => $id, 'login' => $login));
			$result = $statement->fetch();
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return $result;
	}

	// Add a program
	function dbAddProgram($db, $name, $login)
	{
		$name = sanitize_string($name);
		$login = sanitize_string($login);

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
		$name = sanitize_string($name);
		$id = sanitize_strint($id);
		$login = sanitize_string($login);

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
		$id = sanitize_strint($id);
		$login = sanitize_string($login);

		try {
			dbDeleteAllSessionProgram($db, $id, $login);
			dbDeleteAllExerciseProgram($db, $id, $login);
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
		$id_program = sanitize_strint($id_program);
		$login = sanitize_string($login);

		try {
			$statement = $db->prepare('SELECT * FROM exercise WHERE id_program = :id_program AND login = :login');
			$statement->execute(array('id_program' => $id_program, 'login' => $login));
			$result = $statement->fetchAll();
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return $result;
	}

	// Get a specific exercise
	function dbRequestExercise($db, $id, $login)
	{
		$id = sanitize_strint($id);
		$login = sanitize_string($login);

		try {
			$statement = $db->prepare('SELECT * FROM exercise WHERE id = :id AND login = :login');
			$statement->execute(array('id' => $id, 'login' => $login));
			$result = $statement->fetch();
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return $result;
	}

	// Add an exercise
	function dbAddExercise($db, $name, $serie, $repetition, $description, $id_program, $login)
	{
		$name = sanitize_string($name);
		$serie = sanitize_strint($serie);
		$repetition = sanitize_strint($repetition);
		$description = sanitize_string($description);
		$id_program = sanitize_strint($id_program);
		$login = sanitize_string($login);

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
		$name = sanitize_string($name);
		$serie = sanitize_strint($serie);
		$repetition = sanitize_strint($repetition);
		$description = sanitize_string($description);
		$id_program = sanitize_strint($id_program);
		$id = sanitize_strint($id);
		$login = sanitize_string($login);

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
		$id = sanitize_strint($id);
		$login = sanitize_string($login);

		try {
			dbDeleteAllSessionExercise($db, $id, $login);
			$statement = $db->prepare('DELETE FROM exercise WHERE id = :id AND login = :login');
			$statement->execute(array('id' => $id, 'login' => $login));
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return true;
	}

	// Delete all the exercise of a certain program id
	function dbDeleteAllExerciseProgram($db, $id_program, $login)
	{
		$id_program = sanitize_strint($id_program);
		$login = sanitize_string($login);

		try {
			$statement = $db->prepare('DELETE FROM exercise WHERE id_program = :id AND login = :login');
			$statement->execute(array('id' => $id_program, 'login' => $login));
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return true;
	}

	// Get all session of an exercise
	function dbRequestSessions($db, $id_exercise, $login)
	{
		$id_exercise = sanitize_strint($id_exercise);
		$login = sanitize_string($login);

		try {
			$statement = $db->prepare('SELECT * FROM session WHERE id_exercise = :id_exercise AND login = :login');
			$statement->execute(array('id_exercise' => $id_exercise, 'login' => $login));
			$result = $statement->fetchAll();
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return $result;
	}

	// Get a specific session
	function dbRequestSession($db, $id, $login)
	{
		$id = sanitize_strint($id);
		$login = sanitize_string($login);

		try {
			$statement = $db->prepare('SELECT * FROM session WHERE id = :id AND login = :login');
			$statement->execute(array('id' => $id, 'login' => $login));
			$result = $statement->fetch();
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return $result;
	}

	// Add a session
	function dbAddSession($db, $repetition, $serie, $date, $id_exercise, $login)
	{
		$repetition = sanitize_strint($repetition);
		$serie = sanitize_strint($serie);
		$date = sanitize_string($date);
		$id_exercise = sanitize_strint($id_exercise);
		$login = sanitize_string($login);

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
		$repetition = sanitize_strint($repetition);
		$serie = sanitize_strint($serie);
		$date = sanitize_string($date);
		$id_exercise = sanitize_strint($id_exercise);
		$id = sanitize_strint($id);
		$login = sanitize_string($login);

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
		$id = sanitize_strint($id);
		$login = sanitize_string($login);
		
		try {
			$statement = $db->prepare('DELETE FROM session WHERE id = :id AND login = :login');
			$statement->execute(array('id' => $id, 'login' => $login));
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return true;
	}

	// Delete all the session of a certain exercise id
	function dbDeleteAllSessionExercise($db, $id_exercise, $login)
	{
		$id_exercise = sanitize_strint($id_exercise);
		$login = sanitize_string($login);

		try {
			$statement = $db->prepare('DELETE FROM session WHERE id_exercise = :id AND login = :login');
			$statement->execute(array('id' => $id_exercise, 'login' => $login));
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return true;
	}

	// Delete all the session of a certain program id
	function dbDeleteAllSessionProgram($db, $id_program, $login)
	{
		$id_program = sanitize_strint($id_program);
		$login = sanitize_string($login);

		try {
			$statement = $db->prepare('DELETE FROM session WHERE id_exercise IN (SELECT id FROM exercise WHERE id_program = :id) AND login = :login');
			$statement->execute(array('id' => $id_program, 'login' => $login));
		} catch (PDOException $exception) {
			error_log('Request error: ' . $exception->getMessage());
			return false;
		}
		return true;
	}