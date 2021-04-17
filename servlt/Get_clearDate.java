package com.higradius;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;


@WebServlet("/Get_clearDate")
public class Get_clearDate extends HttpServlet {
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
   
    public Get_clearDate() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			PrintWriter out = response.getWriter();
			Class.forName("com.mysql.cj.jdbc.Driver");					
			con = DriverManager.getConnection(DB_URL,DB_USER,DB_PASS);
			String sql = "Select clear_date from invoice_details where doc_id=?";
			String req = request.getParameter("req");
			pst = con.prepareStatement(sql);
			pst.setString(1, req);
			ResultSet rs = pst.executeQuery();
			ArrayList<String> arr = new ArrayList<>();
			while(rs.next()) {
				arr.add(rs.getString(1));
			}
			Gson gson = new Gson();
			String clear_date= gson.toJson(arr);
			response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.print(clear_date);
            out.flush();
		}
		catch(Exception e) {
			e.printStackTrace();
		
	}
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
