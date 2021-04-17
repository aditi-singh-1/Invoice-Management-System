package com.higradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/Edit")
public class Edit extends HttpServlet {
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
			String sql = "UPDATE invoice_details SET total_open_amount = ?,notes=? WHERE doc_id = ?";
			String amount = request.getParameter("amount");
			String notes = request.getParameter("notes");
			String doc_id = request.getParameter("doc_id");
			pst = con.prepareStatement(sql);
			pst.setString(1, amount);
			pst.setString(2, notes);
			pst.setString(3, doc_id);
			pst.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}

	}

	

}
