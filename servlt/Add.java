package com.higradius;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import com.google.gson.Gson;

@WebServlet("/Add")
public class Add extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
	       // Driver and Database URL
			static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
			static final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
			
			// Authentication Credentials
			static final String DB_USER = "root";
			static final String DB_PASS = "new_password";

			//Creating required Objects
			static Connection con = null;
			static PreparedStatement pst = null;

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");					
			con = DriverManager.getConnection(DB_URL,DB_USER,DB_PASS);		
			String query= "insert into invoice_details(cust_number,name_customer,doc_id,total_open_amount,due_in_date,notes) values(?,?, ?,?,?,?)";
			String cust_number = request.getParameter("cust_number");
			String name_customer = request.getParameter("name_customer");
			String doc_id = request.getParameter("doc_id");
			String total_open_amount = request.getParameter("total_open_amount");
			String due_in_date = request.getParameter("due_in_date");
			String notes = request.getParameter("notes");
			System.out.print(doc_id);
			pst = con.prepareStatement(query);
			
			pst.setString(1, cust_number);
			pst.setString(2, name_customer);
			pst.setString(3, doc_id);
			pst.setString(4, total_open_amount);
			pst.setString(5, due_in_date);
			pst.setString(6, notes);
			pst.executeUpdate();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		}

}
