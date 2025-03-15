<?php

class User
{
    private $name;
    private $email;
    private $age;

    public function __construct($name, $email, stdClass $age)
    {
        $this->name = $name;
        $this->email = $email;
        $this->age = $age;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function getAge()
    {
        return $this->age;
    }

    public function setAge($age)
    {
        $this->age = $age;
    }

    public static function createFromArray(array $data)
    {
        return new self($data['name'], $data['email'], $data['age']);
    }
}
