import type { Practical } from '../../types/practical';

export const subject3Practicals: Practical[] = [
  // ============================================================
  // PRACTICAL 1
  // ============================================================

  {
    id: "practical-01",
    number: 1,
    title: "JDBC Database Connectivity",
    language: "Java",

    aim: "Write a program to insert and retrieve the data from database using JDBC.",

    theory: `
JDBC stands for Java Database Connectivity.

JDBC is a Java API used to connect Java applications with databases such as MySQL, Oracle, PostgreSQL, etc.

Using JDBC, a Java application can:
1. Connect to a database.
2. Execute SQL queries.
3. Insert records.
4. Retrieve records.
5. Update records.
6. Delete records.
7. Close the database connection.

Basic JDBC steps:
1. Load JDBC Driver.
2. Establish database connection.
3. Create Statement or PreparedStatement.
4. Execute SQL query.
5. Process ResultSet.
6. Close resources.

Important JDBC classes:
- Connection
- DriverManager
- Statement
- PreparedStatement
- ResultSet
- SQLException

The JDBC driver used in this practical is:
com.mysql.cj.jdbc.Driver

The connection URL follows:
jdbc:mysql://localhost:3306/testdb
`,

    code: `
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Sample {

    public static void main(String[] args) {

        Connection conn = null;

        try {

            // Load MySQL JDBC Driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Connect to database
            conn = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/testdb",
                "root",
                "root"
            );

            System.out.println(
                "Connected to MySQL successfully!"
            );

        } catch (Exception e) {

            e.printStackTrace();

        } finally {

            try {

                if (conn != null)
                    conn.close();

            } catch (SQLException ex) {

                ex.printStackTrace();
            }
        }
    }
}
`,

    conclusion: "Thus, a Java application was successfully connected to a MySQL database using JDBC."
  },


  // ============================================================
  // PRACTICAL 2
  // ============================================================

  {
    id: "practical-02",
    number: 2,
    title: "PreparedStatement and ResultSet",
    language: "Java",

    aim: "Write a program to demonstrate the use of PreparedStatement and ResultSet interface.",

    theory: `
PreparedStatement is a JDBC interface used to execute parameterized SQL queries.

Instead of directly writing values inside an SQL query, placeholders (?) are used.

Advantages of PreparedStatement:
1. Prevents SQL injection.
2. Makes SQL queries easier to reuse.
3. Provides better readability.
4. Allows values to be inserted dynamically.

ResultSet is used to store and retrieve the result returned by a SELECT query.

Important methods:
- setString()
- setInt()
- executeUpdate()
- executeQuery()
- next()
- getString()
- getInt()

In this practical:
1. User enters name, age and course.
2. PreparedStatement inserts the data.
3. ResultSet retrieves student records.
4. Retrieved records are displayed.
`,

    code: `
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Scanner;

public class App {

    public static void main(String[] args) {

        Connection conn = null;
        PreparedStatement pstmt = null;

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter Name: ");
        String name = sc.nextLine();

        System.out.print("Enter Age: ");
        int age = sc.nextInt();

        sc.nextLine();

        System.out.print("Enter Course: ");
        String course = sc.nextLine();

        try {

            conn = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/testdb",
                "root",
                "306116"
            );

            String sql =
                "INSERT INTO student(name,age,course) VALUES(?,?,?)";

            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, name);
            pstmt.setInt(2, age);
            pstmt.setString(3, course);

            int rowsInserted =
                pstmt.executeUpdate();

            if (rowsInserted > 0) {

                System.out.println(
                    "Record inserted successfully!"
                );
            }

            System.out.println(
                "Connected to MySQL successfully!"
            );

        } catch (Exception e) {

            e.printStackTrace();

        } finally {

            try {

                if (pstmt != null)
                    pstmt.close();

                if (conn != null)
                    conn.close();

            } catch (SQLException ex) {

                ex.printStackTrace();
            }
        }
    }
}
`,

    conclusion: "Thus, PreparedStatement was successfully used to insert data into the database and ResultSet can be used to retrieve database records."
  },


  // ============================================================
  // PRACTICAL 3
  // ============================================================

  {
    id: "practical-03",
    number: 3,
    title: "Servlet Programming",
    language: "Java",

    aim: "Servlet Programming: Servlet execution on Tomcat server, Hello World servlet, Display request details, Handle user forms, Cookie creation and retrieval, Session tracking, Chat server using Socket and ServerSocket class, User authentication using HTML forms and Servlet.",

    theory: `
Servlet is a Java server-side technology used to create dynamic web applications.

A Servlet runs on a web server such as Apache Tomcat.

Servlet life cycle:
1. Servlet is loaded.
2. init() is called.
3. service() handles requests.
4. doGet() or doPost() processes HTTP requests.
5. destroy() is called when the servlet is removed.

Tomcat acts as the servlet container.

In this practical, servlet concepts include:
- Hello World Servlet
- Request handling
- HTML forms
- Cookies
- Session tracking
- Socket and ServerSocket
- User authentication

Tomcat configuration:
1. Create a Maven project.
2. Select WAR packaging.
3. Configure Apache Tomcat.
4. Add Jakarta Servlet dependency.
5. Create Servlet class.
6. Configure servlet mapping.
7. Run project on Tomcat.

Example URL:
http://localhost:8080/HelloServletApp/hello
`,

    code: `
// ============================
// web.xml
// ============================

<web-app
    xmlns="http://xmlns.jcp.org/xml/ns/javaee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="
    http://xmlns.jcp.org/xml/ns/javaee
    http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
    version="3.1">

    <servlet>

        <servlet-name>
            HelloServlet
        </servlet-name>

        <servlet-class>
            com.example.HelloServlet
        </servlet-class>

    </servlet>

    <servlet-mapping>

        <servlet-name>
            HelloServlet
        </servlet-name>

        <url-pattern>
            /hello
        </url-pattern>

    </servlet-mapping>

</web-app>


// ============================
// pom.xml
// ============================

<project
    xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

    <modelVersion>4.0.0</modelVersion>

    <groupId>
        com.example
    </groupId>

    <artifactId>
        ServletApp
    </artifactId>

    <version>
        0.0.1-SNAPSHOT
    </version>

    <packaging>
        war
    </packaging>

    <dependencies>

        <dependency>

            <groupId>
                jakarta.servlet
            </groupId>

            <artifactId>
                jakarta.servlet-api
            </artifactId>

            <version>
                6.1.0
            </version>

            <scope>
                provided
            </scope>

        </dependency>

    </dependencies>

</project>


// ============================
// HelloServlet.java
// ============================

package com.example;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class HelloServlet
        extends HttpServlet {

    private static final long
        serialVersionUID = 1L;

    @Override
    protected void doGet(
        HttpServletRequest request,
        HttpServletResponse response
    )
        throws ServletException, IOException {

        response.setContentType(
            "text/html"
        );

        PrintWriter out =
            response.getWriter();

        out.println(
            "<html><body>"
        );

        out.println(
            "<h2>Hiee, this is your first servlet!</h2>"
        );

        out.println(
            "</body></html>"
        );

        out.close();
    }
}
`,

    conclusion: "Thus, Servlet programming was successfully demonstrated using Java and Apache Tomcat."
  },


  // ============================================================
  // PRACTICAL 4
  // ============================================================

  {
    id: "practical-04",
    number: 4,
    title: "JSP Programming",
    language: "JSP / Java",

    aim: "JSP Programming: JSP Hello World application, Arithmetic operations using JSP, JSP forward action tag, Request implicit object handling, Web application to insert records into Oracle Database using JSP and JDBC.",

    theory: `
JSP stands for JavaServer Pages.

JSP is a server-side technology used to create dynamic web pages using HTML and Java.

JSP allows Java code to be embedded inside HTML.

Important JSP features:
1. JSP directives.
2. Scriptlets.
3. Expressions.
4. JSP action tags.
5. Implicit objects.
6. Database connectivity using JDBC.

Important JSP implicit objects include:
- request
- response
- out
- session
- application
- config
- pageContext
- exception

The jsp:forward action tag is used to forward the request from one JSP page to another JSP page.
`,

    code: `
// ============================
// Hello.jsp
// ============================

<%@ page
    language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%>

<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <title>
        Hello World
    </title>

</head>

<body>

    <h1>
        Hello Backend Developer
    </h1>

</body>

</html>


// ============================
// addition.jsp
// ============================

<%@ page
    language="java"
    contentType="text/html"
    pageEncoding="UTF-8"
%>

<!DOCTYPE HTML>

<html>

<body>

<h2>Hello World</h2>

<%

    int a = 10;

    int b = 20;

    int c = 0;

%>

Add :
<%= a + b + c %>
<br/>

Sub :
<%= a - b - c %>
<br/>

Mul :
<%= a * b * c %>
<br/>

Div :
<%= a / b %>
<br/>

Mod :
<%= a % b %>
<br/>

<%

for (
    int i = 0;
    i < 10;
    i++
) {

%>

<p>
    this is the msg from the for loop inside jsp
</p>

<%

}

%>

</body>

</html>


// ============================
// index.jsp
// ============================

<%@ page
    language="java"
    contentType="text/html"
    pageEncoding="UTF-8"
%>

<!DOCTYPE html>

<html>

<body>

<h3>
    This is index.jsp
</h3>

<jsp:forward
    page="Welcome.jsp"
/>

</body>

</html>


// ============================
// welcome.jsp
// ============================

<%@ page
    language="java"
    contentType="text/html"
    pageEncoding="UTF-8"
%>

<!DOCTYPE html>

<html>

<body>

<h3>
    Welcome to JSP Forward Example!
</h3>

</body>

</html>
`,

    conclusion: "Thus, JSP programming was successfully demonstrated using JSP pages, Java expressions, arithmetic operations and JSP forward action."
  },


  // ============================================================
  // PRACTICAL 5
  // ============================================================

  {
    id: "practical-05",
    number: 5,
    title: "Hibernate CRUD Operations",
    language: "Java / Hibernate",

    aim: "Create application to store data in database using Hibernate CRUD operations.",

    theory: `
Hibernate is an Object Relational Mapping (ORM) framework for Java.

ORM maps Java objects to database tables.

CRUD stands for:
- Create
- Read
- Update
- Delete

Hibernate reduces the amount of JDBC code required for database operations.

Important Hibernate components:
- SessionFactory
- Session
- Transaction
- Entity
- Configuration

The @Entity annotation marks a Java class as a database entity.

The @Id annotation identifies the primary key.

CRUD operations:
1. Create - session.persist()
2. Read - session.find()
3. Update - session.merge()
4. Delete - session.remove()

Hibernate configuration is provided using hibernate.cfg.xml.
`,

    code: `
// ============================
// MainApp.java
// ============================

package hibernatecrud;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class MainApp {

    public static void main(String[] args) {

        Configuration config =
            new Configuration().configure();

        try (
            SessionFactory sf =
                config.buildSessionFactory()
        ) {

            // CREATE
            try (
                Session session =
                    sf.openSession()
            ) {

                Transaction tx =
                    session.beginTransaction();

                Student s =
                    new Student();

                s.setId(102);
                s.setName("Vikas");
                s.setMarks(79);

                session.persist(s);

                tx.commit();

                System.out.println(
                    "Student created successfully!"
                );
            }


            // READ
            try (
                Session session =
                    sf.openSession()
            ) {

                Student s =
                    session.find(
                        Student.class,
                        101
                    );

                if (s != null) {

                    System.out.println(
                        "--- Student Details ---"
                    );

                    System.out.println(
                        "ID: " + s.getId()
                    );

                    System.out.println(
                        "Name: " + s.getName()
                    );

                    System.out.println(
                        "Marks: " + s.getMarks()
                    );

                } else {

                    System.out.println(
                        "Student not found!"
                    );
                }
            }


            // UPDATE
            try (
                Session session =
                    sf.openSession()
            ) {

                Transaction tx =
                    session.beginTransaction();

                Student s =
                    session.find(
                        Student.class,
                        101
                    );

                if (s != null) {

                    s.setName("Dilip");
                    s.setMarks(95);

                    session.merge(s);

                    tx.commit();

                    System.out.println(
                        "Student updated successfully!"
                    );

                } else {

                    System.out.println(
                        "Student not found for update!"
                    );
                }
            }


            // DELETE
            try (
                Session session =
                    sf.openSession()
            ) {

                Transaction tx =
                    session.beginTransaction();

                Student s =
                    session.find(
                        Student.class,
                        101
                    );

                if (s != null) {

                    session.remove(s);

                    tx.commit();

                    System.out.println(
                        "Student deleted successfully!"
                    );

                } else {

                    System.out.println(
                        "Student not found for deletion!"
                    );
                }
            }

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}


// ============================
// Student.java
// ============================

package hibernatecrud;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Student {

    @Id
    private int id;

    private String name;

    private int marks;

    public Student() {
        super();
    }

    public Student(
        int id,
        String name,
        int marks
    ) {

        this.id = id;
        this.name = name;
        this.marks = marks;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(
        String name
    ) {

        this.name = name;
    }

    public int getMarks() {
        return marks;
    }

    public void setMarks(
        int marks
    ) {

        this.marks = marks;
    }

    @Override
    public String toString() {

        return
            "Student [id=" + id +
            ", name=" + name +
            ", marks=" + marks + "]";
    }
}


// ============================
// hibernate.cfg.xml
// ============================

<?xml version="1.0"
encoding="UTF-8"?>

<hibernate-configuration>

    <session-factory>

        <property name="hibernate.connection.driver_class">
            com.mysql.cj.jdbc.Driver
        </property>

        <property name="hibernate.connection.url">
            jdbc:mysql://localhost:3306/test
        </property>

        <property name="hibernate.connection.username">
            root
        </property>

        <property name="hibernate.connection.password">
            root
        </property>

        <property name="hibernate.dialect">
            org.hibernate.dialect.MySQLDialect
        </property>

        <property name="hibernate.show_sql">
            true
        </property>

        <property name="hibernate.format_sql">
            true
        </property>

        <property name="hibernate.hbm2ddl.auto">
            update
        </property>

        <property name="hibernate.cache.use_second_level_cache">
            false
        </property>

        <mapping
            class="hibernatecrud.Student"
        />

    </session-factory>

</hibernate-configuration>
`,

    conclusion: "Thus, Hibernate was successfully used to perform Create, Read, Update and Delete operations on student data."
  },


  // ============================================================
  // PRACTICAL 6
  // ============================================================

  {
    id: "practical-06",
    number: 6,
    title: "Spring CRUD Operations",
    language: "Java / Spring / Hibernate",

    aim: "Create application to store data in database using Spring CRUD operations.",

    theory: `
Spring is a Java framework used to develop enterprise applications.

Spring provides features such as:
- Dependency Injection
- Inversion of Control
- Database integration
- MVC architecture
- Transaction management

Dependency Injection means that required objects are provided to a class instead of the class creating them manually.

Important Spring annotations used in this practical:
- @Component
- @Autowired
- @Repository
- @Transactional

The practical demonstrates:
1. Spring dependency injection.
2. Hibernate integration.
3. DAO layer.
4. Entity/POJO.
5. Insert operation.
6. Retrieve operation.
7. Update operation.
8. Delete operation.

CRUD:
Create → Insert data
Read → Retrieve data
Update → Modify data
Delete → Remove data
`,

    code: `
// ============================
// Car.java
// ============================

package springcrudapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class Car {

    private Engine engine;

    @Autowired
    public Engine getEngine() {

        return engine;
    }

    public void setEngine(
        Engine engine
    ) {

        this.engine = engine;
    }

    public void drive() {

        engine.start();

        System.out.println(
            "Car is driving..."
        );
    }
}


// ============================
// Engine.java
// ============================

package springcrudapp;

import org.springframework.stereotype.Component;

@Component
class Engine {

    public void start() {

        System.out.println(
            "Engine started!"
        );
    }
}


// ============================
// MainSpring.java
// ============================

package springcrudapp;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MainSpring {

    public static void main(
        String[] args
    ) {

        ApplicationContext ac =
            new ClassPathXmlApplicationContext(
                "springdemo1.xml"
            );

        Car c1 =
            ac.getBean(Car.class);

        c1.drive();
    }
}


// ============================
// springdemo1.xml
// ============================

<?xml version="1.0"
encoding="UTF-8"?>

<beans
    xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

    <bean
        id="epjcar"
        class="springcrudapp.Car">

        <property
            name="engine"
            ref="epjengine"
        />

    </bean>

    <bean
        id="epjengine"
        class="springcrudapp.Engine"/>

</beans>


// ============================
// StudentDao.java
// ============================

package com.dao;

import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;

import com.pojo.Student;

@Repository
public class StudentDao {

    private SessionFactory factory;

    public StudentDao() {

        super();
    }

    @Autowired
    public void setFactory(
        SessionFactory factory
    ) {

        this.factory = factory;
    }

    @Transactional
    public List<Student> find() {

        Session session =
            factory.getCurrentSession();

        List<Student> data =
            session.createQuery(
                "From Student",
                Student.class
            ).list();

        System.out.println(
            "data fetched successfully"
        );

        return data;
    }

    @Transactional
    public Student find(
        Integer id
    ) {

        Session session =
            factory.getCurrentSession();

        Student s =
            session.get(
                Student.class,
                id
            );

        System.out.println(
            "data fetched successfully"
        );

        return s;
    }

    @Transactional
    public void insert(
        String name,
        long enroll_no,
        Date date,
        String dept
    ) {

        Session session =
            factory.getCurrentSession();

        Student record =
            new Student(
                name,
                enroll_no,
                date,
                dept
            );

        session.persist(record);

        System.out.println(
            "data inserted successfully"
        );
    }

    @Transactional
    public void update(
        Student s
    ) {

        Session session =
            factory.getCurrentSession();

        session.merge(s);

        System.out.println(
            "data updated successfully"
        );
    }

    @Transactional
    public void remove(
        Student s
    ) {

        Session session =
            factory.getCurrentSession();

        session.remove(s);

        System.out.println(
            "data removed successfully"
        );
    }
}


// ============================
// Student.java
// ============================

package com.pojo;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Student {

    @Id
    @GeneratedValue(
        strategy =
            GenerationType.IDENTITY
    )
    Integer id;

    String name;

    long enrollment_no;

    Date dob;

    String department;

    public Student() {

        super();
    }

    public Student(
        String name,
        long enrollment_no,
        Date dob,
        String department
    ) {

        this.name = name;
        this.enrollment_no = enrollment_no;
        this.dob = dob;
        this.department = department;
    }

    public Integer getId() {
        return id;
    }

    public void setId(
        Integer id
    ) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(
        String name
    ) {
        this.name = name;
    }

    public long getEnrollment_no() {
        return enrollment_no;
    }

    public void setEnrollment_no(
        long enrollment_no
    ) {
        this.enrollment_no =
            enrollment_no;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(
        Date dob
    ) {
        this.dob = dob;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(
        String department
    ) {
        this.department =
            department;
    }
}


// ============================
// SpringApplication.java
// ============================

package com.spring;

import java.util.Date;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.dao.StudentDao;
import com.pojo.Student;

public class SpringApplication {

    public static void main(
        String[] args
    ) {

        ApplicationContext container =
            new ClassPathXmlApplicationContext(
                "beans.xml"
            );

        StudentDao dao =
            container.getBean(
                StudentDao.class
            );

        // Insert single record
        dao.insert(
            "Ajay",
            230510500,
            new Date(),
            "CSE"
        );

        // Insert 10 records
        for (int i = 0; i < 10; i++) {

            dao.insert(
                "name " + i,
                (long)(230510500 + i),
                new Date(),
                "CSE"
            );
        }

        // Retrieve records
        List<Student> data =
            dao.find();

        for (
            int i = 0;
            i < data.size();
            i++
        ) {

            System.out.print(
                data.get(i).getId() +
                " | "
            );

            System.out.print(
                data.get(i).getName() +
                " | "
            );

            System.out.print(
                data.get(i).getEnrollment_no() +
                " | "
            );

            System.out.print(
                data.get(i).getDob() +
                " | "
            );

            System.out.print(
                data.get(i).getDepartment() +
                "\\n"
            );
        }

        // Update first record
        Student s =
            data.getFirst();

        s.setDepartment(
            "AIML"
        );

        dao.update(s);

        // Retrieve updated row
        s = dao.find(
            s.getId()
        );

        System.out.println(
            "\\nupdated details:"
        );

        System.out.print(
            s.getId() + " | "
        );

        System.out.print(
            s.getName() + " | "
        );

        System.out.print(
            s.getEnrollment_no() + " | "
        );

        System.out.print(
            s.getDob() + " | "
        );

        System.out.print(
            s.getDepartment() + "\\n"
        );

        // Delete last row
        s =
            data.getLast();

        System.out.println(
            "\\nDeleted Record details:"
        );

        System.out.print(
            s.getId() + " | "
        );

        System.out.print(
            s.getName() + " | "
        );

        System.out.print(
            s.getEnrollment_no() + " | "
        );

        System.out.print(
            s.getDob() + " | "
        );

        System.out.print(
            s.getDepartment() + "\\n"
        );

        dao.remove(s);
    }
}
`,

    conclusion: "Thus, Spring was successfully integrated with Hibernate to perform database CRUD operations using the DAO layer and dependency injection."
  },


  // ============================================================
  // PRACTICAL 7
  // ============================================================

  {
    id: "practical-07",
    number: 7,
    title: "Spring Boot Database Web Application",
    language: "Java / Spring Boot",

    aim: "Create web application to store data in database using Spring Boot framework.",

    theory: `
Spring Boot is a framework built on top of Spring that simplifies the development of Java web applications.

Spring Boot reduces configuration requirements and provides an easy way to create production-ready applications.

Important layers used in this practical:

1. Entity
   Represents database table.

2. Repository
   Provides database operations using Spring Data JPA.

3. Service
   Contains application/business logic.

4. Controller
   Handles HTTP requests and communicates with the service.

5. Thymeleaf
   Used to create dynamic HTML pages.

Application flow:

Browser
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Database

The application supports:
- Displaying users.
- Adding a new user.
- Saving user data.
- Retrieving user records.
- Displaying database records in an HTML table.

The PDF uses H2 in-memory database configuration through application.properties.
`,

    code: `
// ============================
// User.java
// ============================

import javax.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(
        strategy =
            GenerationType.IDENTITY
    )
    private Long id;

    private String name;

    private String email;

    // Getters and setters
}


// ============================
// UserRepository.java
// ============================

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository
        extends JpaRepository<User, Long> {

}


// ============================
// UserService.java
// ============================

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(
        UserRepository repo
    ) {

        this.userRepository = repo;
    }

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    public User saveUser(
        User user
    ) {

        return userRepository.save(
            user
        );
    }
}


// ============================
// UserController.java
// ============================

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

    private final UserService userService;

    public UserController(
        UserService service
    ) {

        this.userService = service;
    }

    @GetMapping("/")
    public String viewUsers(
        Model model
    ) {

        model.addAttribute(
            "users",
            userService.getAllUsers()
        );

        return "index";
    }

    @GetMapping("/new")
    public String showNewUserForm(
        Model model
    ) {

        model.addAttribute(
            "user",
            new User()
        );

        return "new_user";
    }

    @PostMapping("/save")
    public String saveUser(
        @ModelAttribute("user")
        User user
    ) {

        userService.saveUser(
            user
        );

        return "redirect:/";
    }
}


// ============================
// index.html
// ============================

<!DOCTYPE html>

<html
    xmlns:th=
    "http://www.thymeleaf.org"
>

<head>

    <title>
        User List
    </title>

    <style>

        body {

            font-family:
                'Calibri Light',
                sans-serif;

            font-size: 18px;
        }

        table {

            border-collapse:
                collapse;

            width: 60%;

            margin:
                20px auto;
        }

        th, td {

            border:
                1px solid #ccc;

            padding:
                10px;
        }

        th {

            background-color:
                #2980b9;

            color:
                white;
        }

        .center {

            text-align:
                center;
        }

        a {

            text-decoration:
                none;

            color:
                #2980b9;
        }

    </style>

</head>

<body>

    <h1 class="center">
        User List
    </h1>

    <div class="center">

        <a href="/new">
            Add User
        </a>

    </div>

    <table>

        <tr>

            <th>ID</th>

            <th>Name</th>

            <th>Email</th>

        </tr>

        <tr
            th:each=
            "user : \${users}"
        >

            <td
                th:text=
                "\${user.id}">
            </td>

            <td
                th:text=
                "\${user.name}">
            </td>

            <td
                th:text=
                "\${user.email}">
            </td>

        </tr>

    </table>

</body>

</html>


// ============================
// new_user.html
// ============================

<!DOCTYPE html>

<html
    xmlns:th=
    "http://www.thymeleaf.org"
>

<head>

    <title>
        Add User
    </title>

</head>

<body>

    <h1>
        Add New User
    </h1>

    <form
        th:action="@{/save}"
        th:object="\${user}"
        method="post"
    >

        <label>
            Name:
        </label>

        <input
            type="text"
            th:field="*{name}"
            placeholder="Enter name"
            required
        />

        <label>
            Email:
        </label>

        <input
            type="email"
            th:field="*{email}"
            placeholder="Enter email"
            required
        />

        <input
            type="submit"
            value="Save"
        />

    </form>

</body>

</html>


// ============================
// application.properties
// ============================

spring.datasource.url=
jdbc:h2:mem:testdb

spring.datasource.driverClassName=
org.h2.Driver

spring.datasource.username=
sa

spring.datasource.password=

spring.jpa.database-platform=
org.hibernate.dialect.H2Dialect

spring.h2.console.enabled=
true
`,

    conclusion: "Thus, a web application was successfully created using Spring Boot, Spring Data JPA, Thymeleaf and H2 database to store and display user data."
  },
];
